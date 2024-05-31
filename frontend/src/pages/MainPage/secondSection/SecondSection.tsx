import cls from "./SecondSection.module.scss";
import Divider from "@/ui/Divider/Divider.tsx";
import Arrow from "@/assets/arrow.svg";

const gridConfiguration = [
  {
    title: "60к",
    subtitle: "Клиентов и партнеров по всему миру",
  },
  {},
  {
    title: "420к",
    subtitle: "Единиц груза перевозится ежегодно",
  },
  {},
  {
    title: "12",
    subtitle: "Лет наша компания работает на рынке грузоперевозок",
  },
  {
    title: "85",
    subtitle: "Стран в которые мы доставляем грузы",
  },
];

const GridCell = ({ title, subtitle }: any) => {
  return (
    <div className={cls.gridCell}>
      <span className={cls.spB}>{title}</span>
      {subtitle}
    </div>
  );
};

const SecondSection = () => {
  return (
    <div className={cls.wrapperContainer}>
      <span className={cls.spanBig}>
        Многолетний опыт в сфере сухопутной логистики позволяет нам быть вашим
        <span className={cls.spanGreen}> надеждым</span> деловым
        <span className={cls.spanGreen}> партнером</span>
      </span>
      <Divider mt={"40px"} mb={"20px"} />
      <div className={cls.flexthree}>
        <div>Наша команда</div>
        <div>
          ООО «ДМБ ЛОГИСТИКА» — это организация, специализирующаяся в сфере
          логистики и транспортной деятельности. Она предоставляет услуги по
          доставке грузов, управлению складскими запасами, оптимизации
          логистических процессов и многому другому.
          <br />
          <br />
          Одним из ключевых аспектов деятельности ООО "ДМБ ЛОГИСТИКА" является
          предоставление комплексных логистических услуг, включающих в себя
          планирование, координацию и контроль всех этапов транспортной
          логистики. Компания специализируется на международных и домашних
          грузоперевозках, управлении складскими запасами, таможенном
          оформлении, а также на разработке оптимальных маршрутов и стратегий
          доставки.
        </div>
        <div className={cls.flexthreerightCont}>
          <div className={cls.txtBorder}>О компании</div>
          <Arrow />
        </div>
      </div>
      <div className={cls.gridTable}>
        {gridConfiguration.map((element) => {
          return element.title ? (
            <GridCell title={element.title} subtitle={element.subtitle} />
          ) : (
            <div></div>
          );
        })}
      </div>
    </div>
  );
};

export default SecondSection;
