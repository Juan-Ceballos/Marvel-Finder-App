// a component for a div with character image
function MarvelCharacterTN({imgURL, placeholder}) {
    return (
        <div>
            <img src={imgURL} alt={placeholder} />
        </div>
    )
}

// a component for a div with name label
function MarvelNameLabel({name}) {
    return (
        <div>
            <p>{name}</p>
        </div>
    )
}

// default export component holds the image and name div
export default function ProfileContainer({imgURL, name}) {
    return (
        <>
            <MarvelCharacterTN imgURL={imgURL} placeholder={name}/>
            <MarvelNameLabel name={name}/>
        </>
    )
}