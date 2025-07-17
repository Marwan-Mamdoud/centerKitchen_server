// cache.js
import NodeCache from "node-cache";
// إعداد الكاش مع صلاحية البيانات (TTL) - 3600 ثانية (ساعة واحدة)
const cache = new NodeCache({ stdTTL: 3600 });

export default cache;
