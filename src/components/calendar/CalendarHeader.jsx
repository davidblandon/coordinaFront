import React from "react";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { styles } from "../../styles/calendarStyles";
import { UserSwitcher } from "../user/UserSwitcher";

export const CalendarHeader = ({
  weekDisplay,
  onPrevWeek,
  onNextWeek,
  onBack,
}) => (
  <div className={styles.header}>
    <div className={styles.headerContent}>
      <div className={styles.headerTop}>
        <button onClick={onBack} className={styles.backButton}>
          <ArrowLeft className="w-5 h-5" />
          <span className="font-light">Retour</span>
        </button>

        <h1 className={styles.title}>Mon Emploi du Temps</h1>

        <UserSwitcher />
      </div>

      <div className={styles.weekNavigation}>
        <button onClick={onPrevWeek} className={styles.navButton}>
          <ChevronLeft className="w-6 h-6" />
        </button>

        <span className={styles.weekDisplay}>{weekDisplay}</span>

        <button onClick={onNextWeek} className={styles.navButton}>
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  </div>
);
