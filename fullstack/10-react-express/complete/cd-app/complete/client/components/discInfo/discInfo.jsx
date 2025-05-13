export function DiscInfo({coverArt, title, artist}) {
    const [artistBio, setArtistBio] = useState("Loading...");

    useEffect(() => {
        //TODO: Send a request to the API to fetch the artist's bio
        // setArtistBio('');
    }, [])

    return (
        <div className="disc-info__container">
            <div className="disc-info__title">
                {title}
            </div>
            <div className="disc-info__content">
                <span className="disc-info__left-content">
                    <img className="disc-info__cover" src={coverArt} />
                </span>
                <span className="disc-info__right-content">
                    <div className="disc-info__section">
                        <div className="disc-info__section-heading">
                            Artist
                        </div>
                        <div className="disc-info__section-content">
                            {artist}
                        </div>
                    </div>
                    <div className="disc-info__section">
                        <div className="disc-info__section-heading">
                            Bio
                        </div>
                        <div className="disc-info__section-content">
                            {artistBio}
                        </div>
                    </div>
                </span>
            </div>
        </div>
    )
}

module.exports = {
    DiscInfo,
}