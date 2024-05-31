import cls from "./Fsection.module.scss";
import Logo from "@/assets/Logo.svg";
import Divider from "@/ui/Divider/Divider.tsx";

const Fsection = () => {
  return (
    <div className={cls.firstsection}>
      <div>
        <div>&nbsp;</div>
        <div className={cls.header}>
          <Logo />
          <div className={cls.headerlinks}>
            <a href="#" className={cls.link}>
              Главная
            </a>
            <a href="#" className={cls.link}>
              Калькулятор
            </a>
            <a href="#" className={cls.link}>
              О компании
            </a>
            <a href="#" className={cls.link}>
              Контакты
            </a>
          </div>
          <div>
            <a href="#" className={cls.link}>
              Оставить заявку
            </a>
          </div>
        </div>
      </div>
      <div className={cls.fsectionBottonDiv}>
        <div className={cls.flexbts}>
          <div className={cls.txtBorder}>Грузоперевозки</div>
          <span className={cls.spanBig}>
            Безопасная доставка вашего груза <br />
            <span className={cls.spanGreen}>наземным транспортом</span> в любую
            точку мира
          </span>
        </div>
        <Divider mt={"40px"} mb={"15px"} />
        <div className={cls.flex}>
          <div>DMB Logistic (ДМБ Логистика)</div>
          <div>
            Команда профессионалов с опытом более 15 лет, сертифицированных по
            IATA/ICAO. гарантируют качественную и безопасную доставку вашего
            груза наземным транспортом в любую точку мира
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fsection;
