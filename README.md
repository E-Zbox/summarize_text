# summarize\_text

## Tasks to be done

- Backend (Ebenezer / Ajibola)
- Frontend (Ebenezer)
- Machine Learning (Ajibola)

BACKEND

Request: 

endpoint: /

IMAGE
{
	type: "image",
	body: <base64> img,
	user_id: <timestamp> hash,
	summary_type: "moderate"
}

LINK
{
	type: "link",
	body: <url>,
	user_id: <timestamp> hash,
	summary_type: "short"
}

TEXT
{
	type: "text",
	body: <text>,
	user_id: <timestamp> hash,
	summary_type: "long"
}

LOGIC:

endpoint: /

= Get the request
= Process the request

--- MACHINE LEARNING --------

User Response
{
	user_id: <timestamp> hash,
	success: <bool>,
	summary_data: <text>,
	model: <"abstractive" / "extractive">
}

Database Response
{
	prev_user_id: "",
	user_id: <timestamp> hash,
	model: <abstractive / extractive>,
	user_data: <text>,
	summary_data: <text>,
	summary_type: "moderate/short/long"
	review: <-1 / 0 / 1>,
}

= Store in database

UPDATE:

endpoint: /review

= Update Database

FUNCTIONALITY

>>> Thumbs Down

Do you want to try again for a better result?

	YES	         	NO

### END
