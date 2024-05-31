import cls from "./Calculator.module.scss";
import Divider from "@/ui/Divider/Divider.tsx";
import { useStore } from "@/app/stores";
import { observer } from "mobx-react-lite";

const Input = ({ placeholder, value, onChange }: any) => {
  const handleOnChange = (event) => {
    onChange(event.target.value);
  };
  return (
    <div className={cls.rel}>
      <input
        type="text"
        className={cls.input}
        placeholder={placeholder}
        value={value}
        onChange={handleOnChange}
      />
    </div>
  );
};

const SendForm = observer(() => {
  const { authStore } = useStore();
  const { distance, fullDAY, FIO, setFIO, phone, setPhone, sendForm } =
    authStore;
  return (
    <>
      <Divider mt={"20px"} mb={"20px"} />
      <div className={cls.mainCalcWrapper}>
        <Input placeholder={"ФИО"} value={FIO} onChange={setFIO} />
        <Input placeholder={"Телефон"} value={phone} onChange={setPhone} />
        <div className={cls.infodiv}>
          <div>Стоимость доставки:</div>
          <div className={cls.bigSHIt}>
            от {Math.floor(distance) * 35} ₽<br />{" "}
            <span className={cls.small}>{fullDAY} day(s)</span>
          </div>
        </div>
        <button className={cls.btnToCount} onClick={sendForm}>
          Отправить заявку
        </button>
      </div>
    </>
  );
});

export default SendForm;
