import {Icon} from "@iconify/react";

const ControllItem = ({icon, big = false, onClick, disabled}) => {
    return (
        <div onClick={onClick}
             className={`group cursor-pointer rounded-lg transition ${big ? 'py-2 px-10 bg-cPrimary hover:bg-cBgIcon' : 'p-2 bg-cBgIcon hover:bg-cPrimary'}`}>
            <Icon icon={icon}
                  className={`text-2xl transition", ${big ? 'text-white group-hover:text-cPrimary' : 'text-cPrimary group-hover:text-white'} ${disabled && 'text-red-600'}`}/>
        </div>
    )
}

export default ControllItem