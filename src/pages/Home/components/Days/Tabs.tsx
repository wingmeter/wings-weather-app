import s from "./Days.module.scss";

interface Props {}

export const Tabs = (props: Props) => {
  const tabs = [
    {
      value: "For the 3 hours",
    },
  ];
  return (
    <div className={s.tabs}>
      <div className={s.tabs__wrapper}>
        {tabs.map((tab) => (
          <div className={s.tab} key={tab.value}>
            {tab.value}
          </div>
        ))}
      </div>
    </div>
  );
};
