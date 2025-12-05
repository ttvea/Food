import React  from "react";
import "../styles/styles.css"
const LEFT_IMAGE = "https://i.pinimg.com/736x/b6/b8/5f/b6b85f9b4ab78fabebcc5b55596c68ee.jpg";
const RIGHT_ILLUSTRATION = "https://i.pinimg.com/1200x/12/f0/fd/12f0fdad9c6f80d6f0a8f549bd66ded6.jpg";
function Home() {
    return(
        <>
            <div className="container_content">
                <section className="hero">
                    <div className="hero-inner">
                        <div className="hero-left">
                            <div className="photo-frame">
                                <img src={LEFT_IMAGE} alt="Food" className="photo" />
                                <div className="tape tape-top" />
                                <div className="tape tape-bottom" />
                            </div>
                        </div>

                        <div className="hero-center">
                            <h1 className="site-title">ANZI</h1>
                            <div className="divider" />
                            <p className="lead">
                                Cơm nhà là điều xa xỉ giữa cuộc sống đầy bận rộn. Nếu thèm một bữa
                                cơm quê với thịt kho tiêu, canh chua cá hú, đừng ngại ngần mà đến
                                ngay AnZi.
                            </p>
                            <p className="lead">
                                Tại đây, bạn sẽ thưởng thức vị cơm quê nhà ngay tại trung tâm thành
                                phố. Khơi dậy hương vị tuổi thơ và cảm giác ấm cúng trong không gian
                                của chúng tôi. Hãy đến ngay để thưởng thức món ăn “Chuẩn vị cơm nhà”
                                nhé!
                            </p>

                            <a href="menu"> <button className="cta">Xem Menu</button></a>
                        </div>

                        <div className="hero-right">
                            <div className="photo-frame">
                                <img src={RIGHT_ILLUSTRATION} alt="Illustration" className="photo" />
                                <div className="tape tape-top" />
                                <div className="tape tape-bottom" />
                            </div>
                        </div>

                    </div>
                </section>
            </div>
        </>
    )
}
export default Home