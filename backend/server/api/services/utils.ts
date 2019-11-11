import Disc from "../models/disc";
import Collection from "../models/collection";

export class Utils {

    public static toDiscEntity(res): Disc {
        const collection: Collection = {
            id: res.collection_id,
            title: res.collection_title,
            description: res.collection_description,
            discs: null
        };

        return {
            id: res.disc_id,
            title: res.disc_title,
            text: res.disc_text,
            collection: collection
        };
    }

    public static toCollectionEntity(res): Collection {
        return  {
            id: res.id,
            title: res.title,
            description: res.description,
            discs: null
        };
    }
}
