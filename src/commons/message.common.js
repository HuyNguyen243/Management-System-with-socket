import { UserRules } from "../constants";
import { storage } from "../_services/sesionStorage";
import { ROOM_SESSION_MESSAGES } from "../constants";

export const getFormattedDate = ()=>{
    const date = new Date()
    const year = date.getFullYear()
    let month = (1 + date.getMonth()).toString()
    month = month.length > 1 ? month : "0" + month;
    let day = date.getDate().toString()
    day = day.length > 1 ? day : "0" + day;

    return `${day}/${month}/${year}`
}

export const orderIds = (id_from, id_to, type)=>{
    if(id_from && id_to){
      if(id_from > id_to){
        return type + '-' + id_from + '-' + id_to
      }else{
        return type + '-' + id_to + '-' + id_from
      }
    }
}

export const CharacterRoom = (role)=>{
    switch (role) {
        case UserRules.ROLE.ADMIN:
            return UserRules._ROLE.ADMIN
        case UserRules.ROLE.SALER:
            return UserRules._ROLE.SALER
        case UserRules.ROLE.EDITOR:
            return UserRules._ROLE.EDITOR
        case UserRules.ROLE.LEADER_EDITOR:
            return UserRules._ROLE.LEADER_EDITOR
        default:
    }
} 

export const timeAgo = (time)=>{
        time = Date.parse(time);
    switch (typeof time) {
        case 'number':
        break;
        case 'string':
        time = +new Date(time);
        break;
        case 'object':
        if (time.constructor === Date) time = time.getTime();
        break;
        default:
        time = +new Date();
    }

    const time_formats = [
        [60, 'Giây', 1], // 60
        [120, '1 phút trước', '1 phút trước kể từ bây giờ'], // 60*2
        [3600, 'phút', 60], // 60*60, 60
        [7200, '1 giờ trước', '1 giờ trước kể từ bây giờ'], // 60*60*2
        [86400, 'giờ', 3600], // 60*60*24, 60*60
        [172800, 'Hôm qua', 'Tomorrow'], // 60*60*24*2
        [604800, 'Ngày', 86400], // 60*60*24*7, 60*60*24
        [1209600, 'Tuần trước', 'Tuần tới'], // 60*60*24*7*4*2
        [2419200, 'Tuần', 604800], // 60*60*24*7*4, 60*60*24*7
        [4838400, 'Tháng trước', 'Tháng sau'], // 60*60*24*7*4*2
        [29030400, 'Tháng', 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
        [58060800, 'Năm trước', 'Năm sau'], // 60*60*24*7*4*12*2
        [2903040000, 'Năm', 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
        [5806080000, 'Thế kỷ trước', 'Thế kỷ trước kể từ bây giờ'], // 60*60*24*7*4*12*100*2
        [58060800000, 'thế kỷ', 2903040000] // 60*60*24*7*4*12*100*20, 60*60*24*7*4*12*100
    ];
    let seconds = (+new Date() - time) / 1000,
        token = 'trước',
        list_choice = 1;

    if (seconds === 0) {
        return 'Bây giờ'
    }
    if (seconds < 0) {
        seconds = Math.abs(seconds);
        token = 'Từ giờ';
        list_choice = 2;
    }
    let format;

    for(let i = 0; i < time_formats.length; i++) {
        format = time_formats[i++]
        if (seconds < format[0]) {
            if (typeof format[2] == 'string')
                return format[list_choice];
            else
                return Math.floor(seconds / format[2]) + ' ' + format[1] + ' ' + token;
        }
    }

    return time;
}

export const roomStorage = {
    set: (groud_id, privateGroupMsg, privateMemberMsg, role, membersInGroup, namePrivateRoom, received)=>{
        const dataSession = {
            groud_id : groud_id,
            privateGroupMsg : privateGroupMsg,
            privateMemberMsg : privateMemberMsg,
            role: role,
            membersInGroup: membersInGroup,
            namePrivateRoom: namePrivateRoom,
            received : received
        }
        storage.save(ROOM_SESSION_MESSAGES,dataSession)
    },
    get: () => { 
        return storage.get(ROOM_SESSION_MESSAGES)
    },
    delete: () =>{
        storage.delete(ROOM_SESSION_MESSAGES)
    }
    
}