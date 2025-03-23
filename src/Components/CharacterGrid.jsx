import ProfileContainer from "./MarvelCharacterProfile"

export default function CharacterGrid({characters}) {
    return (
        <div className="character-grid">
            {characters.map((character) => (
                <ProfileContainer key={character.id} imgURL={character.imgURL} name={character.name}/>
            )
        )}
        </div>
    )
}