export function DiscTile({coverArt, title, artist, releaseYear}) {
    const onClick = () => {
        //TODO: Redirect the user to the disc's page
    }

    return (
        <span className="disc-tile__container" onClick={onClick}>
            <span className="disc-tile__title">
                {title}
            </span>
            <img className="disc-tile__cover" src={coverArt} />
            <div className="disc-tile__info">
                <span className="disc-tile__artist">
                    {artist}
                </span>
                <span className="disc-title__release-year">
                    {releaseYear}
                </span>
            </div>
        </span>
    );
}

module.exports = {
    DiscTile,
}