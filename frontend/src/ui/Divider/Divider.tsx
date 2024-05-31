import cls from "./Divider.module.scss";

const Divider = ({ mt = "0px", mb = "0px" }: any) => {
  return (
    <div
      className={cls.divider}
      style={{ marginTop: mt, marginBottom: mb }}
    ></div>
  );
};

export default Divider;
