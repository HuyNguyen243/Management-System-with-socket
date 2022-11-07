export const formatDate = (value) => {
    //value =  Thu Nov 24 2022 00:00:00 GMT+0700 (Indochina Time)
    return value.toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
    // => 24/11/2022
}

export const formatTimeStamp = (timestamp)=>{
    // timestamp = 2389283989458343
    const date_not_formatted = new Date(timestamp);
    const month = date_not_formatted.getMonth() + 1;
    const day = date_not_formatted.getDate()
    const year = date_not_formatted.getFullYear()

    let formatted_string = `${month}/${day}/${year}`
    if(month <= 9){
        formatted_string = `0${month}/${day}/${year}`
    }
    if(day <= 9){
        formatted_string = `0${month}/0${day}/${year}`
    }

    return new Date(formatted_string)
    // => 11/24/2022
}

export function convertDate(arr) {
    //arr = [Wed Nov 16 2022 00:00:00 GMT+0700 (Indochina Time), Thu Nov 24 2022 00:00:00 GMT+0700 (Indochina Time)]
    const result = []
    for (let i = 0; i < arr?.length;i++){
        if(arr[i]){
            const date = new Date(arr[i]),
            mnth = ("0" + (date?.getMonth() + 1)).slice(-2),
            day = ("0" + date?.getDate()).slice(-2);
            result.push([day, mnth, date?.getFullYear()].join("-"))
        }
    }
    return result;
    // = > [16/11/2022,24/11/2022]
}

export function dayToTimeStamp(s) {
    //s = 24/11/2022
    const b = s.split(/\D/);
    const d = new Date(b[2], --b[1], b[0]);
    return d && d.getMonth() === b[1]? d : new Date(NaN);
    //return 29389283982832
}
