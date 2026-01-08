import { useState } from "react";
import { useUser } from "../../context/UserContext";
import { styles } from "../../styles/userStyles";

export function UserSwitcher() {
  const { currentUser, users, switchUser } = useUser();
  const [open, setOpen] = useState(false);

  if (!currentUser) {
  return (
    <div className="text-sm text-gray-400 font-light">
      Loading user…
    </div>
  );
}

  return (
    <div className={styles.container}>
      <button
        className={styles.triggerButton}
        onClick={() => setOpen(!open)}
      >
        {currentUser.name}
      </button>

      {open && (
        <div className={styles.dropdown}>
          {users.map((user) =>
            user.id === currentUser.id ? (
              <div key={user.id} className={styles.optionActive}>
                {user.name}
              </div>
            ) : (
              <div
                key={user.id}
                className={styles.option}
                onClick={() => {
                  switchUser(user);
                  setOpen(false);
                }}
              >
                {user.name}
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}
