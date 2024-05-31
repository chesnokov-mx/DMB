import cls from "./Calculator.module.scss";
import cn from "classnames";
import { useEffect, useRef, useState } from "react";
import Divider from "@/ui/Divider/Divider.tsx";
import { towns } from "@/app/allTowns.ts";
import { observer } from "mobx-react-lite";
import { useStore } from "@/app/stores";
import SendForm from "@/pages/MainPage/calc/SendForm.tsx";

const OptionsContainer = [
  "Универсальный контейнер",
  "Грузоперевозки",
  "Сборный груз",
  "Рефконтейнер",
  "Трекинг",
];

const DropDownOption = ({ children, onClick }: any) => {
  return (
    <div
      className={cls.DropDownOption}
      onClick={() => {
        onClick(children);
      }}
    >
      {children}
    </div>
  );
};

const Input = ({
  value,
  onClick,
  isDisabled = false,
  placeholder = "",
}: any) => {
  const [filteredTowns, setFilteredTowns] = useState(towns);

  const handleOnClick = (e) => {
    onClick(e);
    setDropDownOpen(false);
  };

  const handleOnChange = (event) => {
    setFilteredTowns(
      towns.filter((town) => town.address.includes(event.target.value)),
    );
    onClick(event.target.value);
  };

  const [dropDownOpen, setDropDownOpen] = useState(false);

  const ref = useRef(null);
  const refForDropdown = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        refForDropdown.current &&
        // @ts-ignore
        !refForDropdown.current.contains(event.target)
      ) {
        setDropDownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
    <div className={cls.rel} ref={refForDropdown}>
      <input
        type="text"
        disabled={isDisabled}
        className={cls.input}
        value={value}
        onFocus={() => setDropDownOpen(true)}
        placeholder={placeholder}
        ref={ref}
        onChange={handleOnChange}
      />
      {dropDownOpen && (
        <div
          className={cls.dropdown}
          style={{ width: ref?.current?.offsetWidth || "100px" }}
        >
          {filteredTowns.map((element) => (
            <DropDownOption onClick={handleOnClick}>
              {element.address}
            </DropDownOption>
          ))}
        </div>
      )}
    </div>
  );
};

const Option = ({ children, selected = true, onClick }: any) => {
  return (
    <div
      className={cn(cls.txtBorder, { [cls.selectedclass]: selected })}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

const Calculator = observer(() => {
  const { authStore } = useStore();
  const {
    townTo,
    setTownFrom,
    townFrom,
    setTownTo,
    formOpened,
    setFormOpened,
  } = authStore;
  const [indexSelectedOption, setIndexSelectedOption] = useState(0);
  return (
    <div className={cls.wrapper}>
      <span className={cls.calcHeader}>Рассчитать стоимость</span>
      <br />
      <div className={cls.optionsWrapper}>
        {OptionsContainer.map((element, index) => (
          <Option
            selected={index === indexSelectedOption}
            onClick={() => setIndexSelectedOption(index)}
          >
            {element}
          </Option>
        ))}
      </div>
      <Divider mt={"20px"} mb={"20px"} />
      <div className={cls.mainCalcWrapper}>
        <Input
          placeholder={"Откуда"}
          value={townFrom}
          onClick={(str: any) => {
            setTownFrom(str);
          }}
        />
        <Input placeholder={"Куда"} value={townTo} onClick={setTownTo} />
        <Input
          value={OptionsContainer[indexSelectedOption]}
          isDisabled={true}
        />
        <button
          className={cn(cls.btnToCount, { [cls.active]: formOpened })}
          onClick={() => setFormOpened(true)}
        >
          Рассчитать
        </button>
      </div>
      {formOpened && <SendForm />}
    </div>
  );
});

export default Calculator;
