import s from "./Spinner.module.scss";

const Spinner = () => {
  return (
    <div className={s.loader}>
      <div className={s.skChase}>
        <div className={s.skChaseDot}></div>
        <div className={s.skChaseDot}></div>
        <div className={s.skChaseDot}></div>
        <div className={s.skChaseDot}></div>
        <div className={s.skChaseDot}></div>
        <div className={s.skChaseDot}></div>
      </div>
    </div>
  );
};
export default Spinner;
