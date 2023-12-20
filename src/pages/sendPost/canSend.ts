export default function canSend() {
    const delay = 12 * 60 * 60 * 1000; // 12小时    
    if(new Date().getTime() < 1703089144969 + delay){
        return true;
    }
    return false;
}