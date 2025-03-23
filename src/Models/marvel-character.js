// class representing a marvel character and properties like name
export class MarvelCharacter {
    constructor(data) {
        this.id = data.id
        this.name = data.name
        this.description = data.description
    }

    static fromJSON(json) {
        return new MarvelCharacter(json)
    }
}

export default {
    MarvelCharacter
}

