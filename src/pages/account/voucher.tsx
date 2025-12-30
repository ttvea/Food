import "../../styles/styles.css";
import React, { useEffect, useState } from "react";
import { api } from "../../services/api";
import {Link} from "react-router-dom";

function Voucher() {
    const [inputCode, setInputCode] = useState("");
    const [myVouchers, setMyVouchers] = useState<any[]>([]);
    const isExpired = (expireDate: string) => {
        return new Date(expireDate) < new Date();
    };
    const [toast, setToast] = useState<{
        message: string;
        type: "success" | "error" | "warning";
    } | null>(null);
    const userId = localStorage.getItem("userId");
    const showToast = (message: string, type: "success" | "error" | "warning") => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 2500);
    };

    useEffect(() => {
        if (!userId) return;

        api.getUserVouchersWithDetail(userId)
            .then(setMyVouchers);
    }, [userId]);

    const handleApplyVoucher = async () => {
        if (!userId) return;

        // Tìm voucher theo code
        const vouchers = await api.getVoucherByCode(inputCode.trim());

        if (vouchers.length === 0) {
            showToast("Mã voucher không hợp lệ", "error");
            return;
        }

        const voucher = vouchers[0];

        // Check hết hạn
        if (new Date(voucher.expireDate) < new Date()) {
            showToast("Voucher đã hết hiệu lực", "error");
            return;
        }

        // Lấy danh sách userVoucher
        const allUserVouchers = await api.getAllUserVouchers();

        // Đếm số lượt đã nhận
        const usedCount = allUserVouchers.filter(
            (uv: any) => uv.voucherId === voucher.id
        ).length;

        const remaining = voucher.quantity - usedCount;

        // HẾT SỐ LƯỢNG
        if (remaining <= 0) {
            showToast("Voucher đã hết số lượng", "error");
            return;
        }

        // Check user đã sở hữu chưa
        const existed = allUserVouchers.find(
            (uv: any) => uv.userId === userId && uv.voucherId === voucher.id
        );

        if (existed) {
            showToast("Bạn đã sở hữu voucher này", "warning");
            return;
        }

        // Lưu voucher cho user
        await api.addUserVoucher({
            userId,
            voucherId: voucher.id,
            code: voucher.code,
            used: false
        });

        showToast("Nhận voucher thành công", "success");

        setInputCode("");

        const updated = await api.getUserVouchersWithDetail(userId);
        setMyVouchers(updated);
    };



    const handleDeleteVoucher = async (userVoucherId: number) => {
        if (!userId) return;
        const ok = window.confirm("Bạn có chắc muốn xóa voucher này không?");
        if (!ok) return;

        await api.deleteUserVoucher(userVoucherId);

        showToast("Đã xóa voucher", "success");
        const updated = await api.getUserVouchersWithDetail(userId);
        setMyVouchers(updated);
    };

    return (
        <div className="voucher-container">
            {/* ===== HEADER ===== */}
            <div className="voucher-header">
                <h3>Kho Voucher</h3>
            </div>

            {/* ===== INPUT ===== */}
            <div className="voucher-input-box">
                <span className="voucher-label">Mã Voucher</span>
                <input
                    type="text"
                    placeholder="Nhập mã voucher tại đây"
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                />
                <button
                    className="btn-save"
                    onClick={handleApplyVoucher}
                    disabled={!inputCode.trim()}
                >
                    Lưu
                </button>
            </div>

            {/* ===== LIST VOUCHER ===== */}
            <div className="voucher-list">
                {myVouchers.length === 0 && (
                    <div className="voucher-empty">
                        <img
                            src="/Discount-amico.png"
                            alt="No voucher"
                        />
                        <p>Bạn chưa có voucher nào</p>
                        <span>Hãy nhập mã voucher để nhận ưu đãi 🎁</span>
                    </div>
                )}


                {myVouchers.map((v) => {
                    const voucher = v.voucher;
                    if (!voucher) return null;

                    const expired = isExpired(voucher.expireDate);

                    return (
                        <div className={`voucher-item ${expired ? "expired" : ""}`}>
                            {/* NÚT XÓA */}
                            <button
                                className="btn-delete-voucher"
                                onClick={() => handleDeleteVoucher(v.id)}
                                title="Xóa voucher"
                            >
                                ✕
                            </button>

                            <div className="voucher-left">
                                <span>Giảm giá</span>
                            </div>

                            <div className="voucher-info">
                                <h4>
                                    {voucher.discountType === "PERCENT"
                                        ? `Giảm ${voucher.discountValue}%`
                                        : `Giảm ${voucher.discountValue.toLocaleString()}đ`}
                                </h4>

                                <p>
                                    Đơn tối thiểu {voucher.minOrder.toLocaleString()}đ
                                </p>

                                <p className={`voucher-expired ${expired ? "text-danger" : ""}`}>
                                    HSD: {voucher.expireDate}
                                </p>

                                {expired ? (
                                    <button className="btn-use disabled" disabled>
                                        Đã hết hạn
                                    </button>
                                ) : (
                                    <Link to="/order">
                                        <button className="btn-use">Dùng ngay</button>
                                    </Link>
                                )}
                            </div>
                        </div>
                    );
                })}


            </div>
            {toast && (
                <div className={`custom-toast ${toast.type}`}>
                    {toast.type === "success" && <i className="fa-solid fa-circle-check"></i>}
                    {toast.type === "error" && <i className="fa-solid fa-circle-xmark"></i>}
                    {toast.type === "warning" && <i className="fa-solid fa-triangle-exclamation"></i>}
                    {toast.message}
                </div>
            )}

        </div>
    );
}

export default Voucher;
