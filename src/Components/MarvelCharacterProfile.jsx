// a component for a div with character image
function MarvelCharacterTN({imgURL, placeholder}) {
    return (
        <div className="character-image-container">
            <img src={imgURL} alt={placeholder} className="character-image"/>
        </div>
    )
}

// a component for a div with name label
function MarvelNameLabel({name}) {
    return (
        <div className="character-name-container">
            <p className="character-name">{name}</p>
        </div>
    )
}

// default export component holds the image and name div
export default function ProfileContainer({imgURL, name}) {
    return (
        <div className="profile-container">
            <MarvelCharacterTN imgURL={imgURL} placeholder={name}/>
            <MarvelNameLabel name={name}/>
        </div>
    )
}