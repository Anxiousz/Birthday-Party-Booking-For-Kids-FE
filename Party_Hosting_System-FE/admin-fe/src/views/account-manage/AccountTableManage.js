import React, { useState } from "react";
import AccountStaffManage from "./staffpage/StaffTable";
import AccountPartyHostManage from "./PartyHostTable";
import AccountUserManage from "./UserTable";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp, faTable } from '@fortawesome/free-solid-svg-icons';

const AccountTableManage = () => {
  const [selectedItem, setSelectedItem] = useState("staff");
  const [isListExpanded, setListExpanded] = useState(false);

  const toggleList = () => {
    setListExpanded(!isListExpanded);
  };

  const renderSelectedItem = () => {
    switch (selectedItem) {
      case "staff":
        return <AccountStaffManage />;
      case "partyhost":
        return <AccountPartyHostManage />;
      case "user":
        return <AccountUserManage />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="tw-w-1/6 tw-flex dark:tw-bg-gray-800 tw-border-zinc-500 tw-border-r">
        <ul className="tw-p-4 tw-w-full tw-text-lg ">
          <button
            type="button"
            className="tw-flex tw-items-center tw-w-full tw-p-2 tw-text-zinc-900 tw-transition tw-duration-75 tw-rounded-lg group hover:tw-bg-zinc-300"
            aria-expanded={isListExpanded}
            onClick={toggleList}
          >
            <FontAwesomeIcon className="tw-pr-2" icon={faTable} />
            <span>Quản lý Account</span>
            {isListExpanded ? <FontAwesomeIcon icon={faCaretUp} /> : <FontAwesomeIcon icon={faCaretDown} />}
          </button>
          {isListExpanded && (
            <div className="tw-space-y-2 tw-py-2">
              <button
                className="tw-cursor-pointer tw-p-2 tw-rounded-lg group hover:tw-bg-zinc-300"
                onClick={() => setSelectedItem("staff")}
                onKeyDown={(e) => e.key === 'Enter' && setSelectedItem("staff")}
              >
                Staff
              </button>
              <button
                className="tw-cursor-pointer tw-p-2 tw-rounded-lg group hover:tw-bg-zinc-300"
                onClick={() => setSelectedItem("partyhost")}
                onKeyDown={(e) => e.key === 'Enter' && setSelectedItem("partyhost")}
              >
                PartyHost
              </button>
              <button
                className="tw-cursor-pointer tw-p-2 tw-rounded-lg group hover:tw-bg-zinc-300"
                onClick={() => setSelectedItem("user")}
                onKeyDown={(e) => e.key === 'Enter' && setSelectedItem("user")}
              >
                User
              </button>
            </div>
          )}
        </ul>
      </div>
      <div className="tw-w-5/6 dark:tw-bg-gray-800 tw-text-zinc-900">
        <div className="tw-h-full tw-relative tw-w-full">
          {renderSelectedItem()}
        </div>
      </div>
    </>
  );
};

export default AccountTableManage;