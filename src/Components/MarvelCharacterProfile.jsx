// a component for a div with character image
function MarvelCharacterTN() {
    return (
        <div>
            <img src="null" alt="picture-here" />
        </div>
    )
}

// a component for a div with name label
function MarvelNameLabel() {
    return (
        <div>
            <p>Name Here</p>
        </div>
    )
}

// default export component holds the image and name div
export default function ProfileContainer() {
    return (
        <>
            <MarvelCharacterTN></MarvelCharacterTN>
            <MarvelNameLabel></MarvelNameLabel>
        </>
    )
}