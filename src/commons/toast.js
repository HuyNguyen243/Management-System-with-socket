const TIME = 3000

export const toastMsg = {
    success : (toast,messages)=>{
        toast.current.show({severity:'success',summary: 'Thành công' , detail:messages, life: TIME});
    },
    error: (toast,messages)=>{
        toast.current.show({severity:'error',summary: 'Thất bại' , detail:messages, life: TIME});
    },
    info: (toast,messages)=>{
        toast.current.show({severity:'info',summary: 'Thông báo' , detail:messages, life: TIME});
    },
    warn: (toast,messages)=>{
        toast.current.show({severity:'warn',summary: 'Cảnh báo ' , detail:messages, life: TIME});
    },
}