import { ReactElement } from "react";
import { Link } from "react-router";
import { ReactComponent as EditIcon } from "../../icons/edit-icon.svg";
import { ReactComponent as TrashIcon } from "../../icons/trash-icon.svg";
import "./navigation.css";
import { Feed } from "../../types";

type NavigationProps = {
  feeds: Feed[];
  handleRemoveFeed: (id: string) => void;
};

const Navigation = ({
  feeds,
  handleRemoveFeed,
}: NavigationProps): ReactElement<NavigationProps> => {
  return (
    <aside className="navigation-container">
      <h1 className="navigation-title">RSS Reader</h1>

      <Link to="/add-feed" className="navigation-add-link" title="Add new feed">
        + Add Feed
      </Link>

      {feeds.length === 0 ? null : (
        <div>
          <h2 className="navigation-subtitle">Feeds List</h2>

          <Link to="/" className="navigation-feed-item" title="All feeds">
            All feeds
          </Link>

          <div>
            {feeds.map((feed) => (
              <div key={`nav-link-${feed.id}`} className="navigation-feed-item">
                <Link to={`/feed/${feed.id}`} title={feed.name}>
                  {feed.name}
                </Link>

                <div className="navigation-icon-group">
                  <Link to={`/edit-feed/${feed.id}`} title="Edit">
                    <EditIcon className="navigation-icon-edit" />
                  </Link>

                  <button onClick={() => handleRemoveFeed(feed.id)} title="Remove">
                    <TrashIcon className="navigation-icon-trash" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
};

export default Navigation;
