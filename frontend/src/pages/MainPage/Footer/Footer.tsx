import cls from "./Footer.module.scss";
import Logo from "@/assets/Logo.svg";

const Footer = () => {
  return (
    <div className={cls.footerWrapper}>
      <div className={cls.footerContent}>
        <div className={cls.flex4}>
          <div>
            <Logo />
          </div>
          <div className={cls.linksCont}>
            <span>Страницы</span>
            <div>Главная</div>
            <div>О компании</div>
            <div>Карьера</div>
            <div>Инфоцентр</div>
            <div>Контакты</div>
          </div>
          <div className={cls.linksCont}>
            <span>Услуги</span>
            <div>Перевозки</div>
            <div>Мультимодальные перевозки</div>
            <div>Проектные грузы</div>
            <div>Оставить заявку</div>
          </div>
          <div className={cls.linksCont}>
            <div className={cls.green}>Рассчитать стоимость</div>
            <div>+7 (812) 002-95-55</div>
            <div>office@dmb-logistic.com</div>
            <span>Telegram</span> <span> Vkontakte</span>
          </div>
        </div>
        <div className={cls.flexbet}>
          <div>© 2024 DMB logistic. Все права защищены</div>
          <div>Политика конфиденциальности</div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
