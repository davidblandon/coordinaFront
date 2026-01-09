import React, { useState, useRef, useEffect } from 'react';
import { useUser } from '../../context/UserContext';
import { styles } from '../../styles/userStyles';

export const UserSwitcher = () => {
  const { currentUser, users, switchUser } = useUser();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Fermer le dropdown si on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  if (!currentUser) {
    return (
      <div className="text-sm text-gray-400 font-light">
        Loading user…
      </div>
    );
  }

  return (
    <div className={styles.container} ref={dropdownRef}>
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
                  switchUser(user.id);
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
};
