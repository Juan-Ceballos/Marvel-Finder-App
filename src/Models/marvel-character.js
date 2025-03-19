// class representing a marvel character and properties like name
export class MarvelCharacter {
    constructor(data) {
        this.id = data.id
        this.name = data.name
        this.description = data.description
        this.resourceURI = data.resourceURI
        this.thumbnail = data.thumbnail
        this.comics = data.comics
    }

    static fromJSON(json) {
        return new MarvelCharacter(json)
    }
}

export default {
    MarvelCharacter
}