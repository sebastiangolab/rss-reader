import { ReactElement } from "react";
import { Feed } from "../../types";
import FeedForm, { FeedFormAction } from "../../components/FeedForm";

type AddFeedFormViewProps = {
  handleAddFeed: (newFeed: Feed) => void;
};

const AddFeedFormView = ({
  handleAddFeed,
}: AddFeedFormViewProps): ReactElement<AddFeedFormViewProps> | null => {
  return (
    <FeedForm
      formAction={FeedFormAction.ADD}
      formTitle="Add feed"
      submitText="Add"
      successText="Feed has been added successfully!"
      handleAddFeed={handleAddFeed}
    />
  );
};

export default AddFeedFormView;
