import { ReactElement } from "react";
import { Feed } from "../../types";
import { useParams } from "react-router";
import FeedForm, { FeedFormAction } from "../../components/FeedForm";

type EditFeedFormViewProps = {
  feeds: Feed[];
  handleEditFeed: (feed: Feed) => void;
};

const EditFeedFormView = ({
  feeds,
  handleEditFeed,
}: EditFeedFormViewProps): ReactElement<EditFeedFormViewProps> | null => {
  const { id } = useParams<{ id: string }>();

  const activeFeed = id ? feeds.find((feed) => feed.id === id) : null;

  if (!activeFeed) {
    console.error("Edited feed is undefined");

    return null;
  }

  return (
    <FeedForm
      formAction={FeedFormAction.EDIT}
      formTitle={`Edit form "${activeFeed?.name}"`}
      submitText="Edit"
      successText="Feed has been edited successfully!"
      editedFeed={activeFeed}
      handleEditFeed={handleEditFeed}
    />
  );
};

export default EditFeedFormView;
