import { UserRules,CustomerRules } from "../../constants";

export const itemUserTemplate = (item) => {
    return (
        <div className="dropdown-item flex justify-content-between align-items-center">
            <div>{item.fullname}</div>
            <div>{item.status === UserRules.STATUS.OFFLINE ?
                <span className="dots_offline"></span> :
                (item.status === UserRules.STATUS.ONLINE ?
                    <span className="dots_online"></span>
                    : <span className="dots_busy"></span>)}</div>
        </div>
    );
}

export const itemCustomerTemplate = (item) => {
    return (
        <div className="dropdown-item flex justify-content-between align-items-center">
            <div>{item.infor_reminder}</div>
            <div>{item.status === CustomerRules.STATUS.UNREQUEST ?
                <span className="dots_offline"></span> :
                (item.status === CustomerRules.STATUS.REQUEST ?
                    <span className="dots_online"></span>
                    : <span className="dots_busy"></span>)}</div>
        </div>
    );
}