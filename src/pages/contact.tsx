import React from "react";

function Contact() {
    return (
        <section className="contact-section">
            <div className="contact-container">
                <div className="dashed-line"></div>

                <div className="contact-grid">
                    <div className="contact-box">
                        <div className="icon-wrapper"><i className="fa-solid fa-location-dot"></i></div>
                        <div>
                        <div className="title">Địa chỉ</div>
                            <div className="text">
                                Khu phố 33, phường Linh Xuân<br /> TP. HCM
                            </div>
                        </div>
                    </div>

                    <div className="contact-box">
                        <div className="icon-wrapper"><i className="fa-solid fa-phone"></i></div>
                        <div>
                        <div className="title">Hotline</div>
                            <div className="text">
                                0868 338 302 <span>(Đặt cơm)</span><br />
                                <span>(Hợp tác)</span>
                            </div>
                        </div>
                    </div>

                    <div className="contact-box">
                        <div className="icon-wrapper"><i className="fa-solid fa-envelope"></i></div>
                        <div>
                        <div className="title">Email</div>
                            <div className="text">
                                yennhinguyen102@gmail.com<br />
                                <span>(Trao đổi hợp tác)</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="dashed-line"></div>
            </div>
        </section>
    );
}

export default Contact;