import "./styles/index.scss";
import { observer } from "mobx-react-lite";
import rootStore from "@/app/stores/RootStore.ts";
import { Provider } from "@/app/stores/useStore.tsx";
import cls from "./App.module.scss";
import { useEffect, useState } from "react";

async function getForms(cb: any) {
  const response = await fetch("http://localhost:3001/pivo", {
    method: "get",
  });

  response.json().then((data) => cb(data));
}

const GridRow = ({ Tfrom, Tto, fio, phone, cost }) => {
  return (
    <>
      <div className={cls.cell}>{fio}</div>
      <div className={cls.cell}>{phone}</div>
      <div className={cls.cell}>{Tfrom}</div>
      <div className={cls.cell}>{Tto}</div>
      <div className={cls.cell}>{cost}</div>
    </>
  );
};

const GridHeader = () => {
  return (
    <>
      <div className={cls.cell}>ФИО</div>
      <div className={cls.cell}>Телефон</div>
      <div className={cls.cell}>Город отправления</div>
      <div className={cls.cell}>Город прибытия</div>
      <div className={cls.cell}>Стоимость</div>
    </>
  );
};

const _App = observer(() => {
  const [table, setTable] = useState<any[] | null>(null);

  useEffect(() => {
    getForms(setTable);
  }, []);

  useEffect(() => {
    console.log(table);
  }, [table]);

  return (
    <div className={cls.wrapper}>
      <h1>Список заявок</h1>
      <div className={cls.gridTable}>
        <GridHeader />
        {table &&
          table.map((form) => {
            return (
              <GridRow
                Tfrom={form.townFrom}
                Tto={form.townTo}
                fio={form.FIO}
                phone={form.phone}
                cost={ Math.floor(form.distance) * 35}
              />
            );
          })}
      </div>
    </div>
  );
});

function App() {
  return (
    <>
      <Provider value={rootStore}>
        <_App />
      </Provider>
    </>
  );
}

export default App;
