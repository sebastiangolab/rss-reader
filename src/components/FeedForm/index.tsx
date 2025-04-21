import { ReactElement } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Feed } from "../../types";
import { v4 as uuidv4 } from "uuid";
import { validateFeedUrl } from "../../utils/rss";

export enum FeedFormAction {
  ADD = "add",
  EDIT = "edit",
}

type FeedFormInputs = {
  name: string;
  url: string;
};

type FeedFormProps = {
  formAction: FeedFormAction;
  formTitle: string;
  submitText: string;
  successText: string;
  editedFeed?: Feed;
  handleEditFeed?: (feed: Feed) => void;
  handleAddFeed?: (newFeed: Feed) => void;
};

const FeedForm = ({
  formAction,
  formTitle,
  submitText,
  successText,
  editedFeed,
  handleAddFeed,
  handleEditFeed,
}: FeedFormProps): ReactElement<FeedFormProps> => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    setError,
    reset,
  } = useForm<FeedFormInputs>();

  const onSubmit: SubmitHandler<FeedFormInputs> = async (formData): Promise<void> => {
    if (!formData.name && !formData.url) {
      setError("root", {
        type: "manual",
        message: "Please fill in at least one field",
      });

      return;
    }

    if (formData.url) {
      const isFeedUrlValid = await validateFeedUrl(formData.url);

      if (!isFeedUrlValid) {
        setError("url", {
          type: "manual",
          message: "Your feed url is invalid",
        });

        return;
      }
    }

    if (formAction === FeedFormAction.ADD && handleAddFeed) {
      handleAddFeed({
        id: uuidv4(),
        name: formData.name,
        url: formData.url,
      });
    }

    if (formAction === FeedFormAction.EDIT && editedFeed && handleEditFeed) {
      handleEditFeed({
        id: editedFeed.id,
        name: formData.name || editedFeed.name,
        url: formData.url || editedFeed.url,
      });
    }

    reset();
  };

  return (
    <div className="form">
      <h1 className="form-title">{formTitle}</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-field">
          <label htmlFor="name" className="form-label">
            Feed Name
          </label>

          <input
            id="name"
            {...register("name", { required: formAction === FeedFormAction.ADD })}
            className="form-input"
          />

          {errors.name && <p className="form-error">Name field is required</p>}
        </div>

        <div className="form-field">
          <label htmlFor="url" className="form-label">
            Feed URL
          </label>

          <input
            id="url"
            {...register("url", { required: formAction === FeedFormAction.ADD })}
            className="form-input"
          />

          {errors.url && (
            <p className="form-error">{errors.url.message || "Url field is required"}</p>
          )}
        </div>

        {errors.root?.message && <p className="form-error">{errors.root.message}</p>}

        {isSubmitSuccessful && <p className="form-success">{successText}</p>}

        <div>
          <input type="submit" value={submitText} className="form-submit" />
        </div>
      </form>
    </div>
  );
};

export default FeedForm;
