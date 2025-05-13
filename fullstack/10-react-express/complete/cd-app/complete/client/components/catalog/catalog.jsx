const { DiscTile } = require("../discTile/discTile");

function Catalog({tileCount = 9}) {
    const [tileInfo, setTileInfo] = useState([]);

    useEffect(() => {
        //TODO: Request tile info from API
        //set tile info state
    }, []);

    return (
        <div className="catalog__container">
            {tileInfo.map((info, index) => {
                <DiscTile
                    coverArt={info.coverArt}
                    title={info.title}
                    artist={info.artist}
                    releaseYear={info.releaseYear}
                    key={`disc-title-${index}`}
                />
            })}
        </div>
    )
}

module.exports = {
    Catalog
};