import { useParams, useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { join } from "redux-saga/effects";
import { Grid, Typography } from "@mui/material";

function CandidateJobDetails() {
  const params = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const appliedJobsList = useSelector(
    (store) => store.candidateReducer.appliedJobs
  );
  const job = useSelector((store) => store.candidateReducer.candidateJobs);
  const savedJobsList = useSelector((store) => store.candidateReducer.saveJobs);
  const info = useSelector((store) => store.candidateReducer.candidateInfo);
  console.log(" applied jobs ", job[0].id);

  //FETCH CURRENT JOB WITH PARAMS ID
  useEffect(() => {
    dispatch({
      type: "VIEW_JOB_DETAILS",
      payload: `${params.id}`,
    });
    dispatch({ type: "FETCH_SAVED_JOBS" });
    // console.log(params.id)
  }, []);

  function submitSave() {
    dispatch({
      type: "FETCH_SAVED_JOBS",
    });
  }

  const ProfilePage = () => {
    history.push(`/profile`);
  };

  console.log("params.id is...", params.id);

  function goBack() {
    window.history.back();
  }

return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={3}></Grid>
        <Grid item xs={5}>
          <button onClick={goBack}>Back</button>
        </Grid>
        <Grid item xs={3}>
          {info.id ? (
            <div>
              <div onClick={submitSave}>
                {savedJobsList.find((c) => c.id === job[0].id) ? (
                  <button
                    onClick={() => {
                      dispatch({
                        type: "DELETE_JOB",
                        payload: job[0],
                      });
                      dispatch({ type: "FETCH_SAVED_JOBS" });
                    }}
                  >
                    Unsave
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      dispatch({
                        type: "SAVE_JOBS",
                        payload: job[0],
                      });
                      dispatch({ type: "FETCH_SAVED_JOBS" });
                    }}
                  >
                    Save{" "}
                  </button>
                )}
              </div>

              {appliedJobsList.find((d) => d.id === job[0].id) ? (
                <p>Applied</p>
              ) : (
                <button
                  onClick={() => {
                    dispatch({
                      type: "APPLY_JOB",
                      payload: job[0],
                    });
                    history.push("/applied");
                  }}
                >
                  Apply
                </button>
              )}
            </div>
          ) : (
            <>
              <button onClick={ProfilePage}>
                Complete Your Profile to Save and Apply
              </button>
            </>
          )}
        </Grid>

        {/* <h1>Candidate Job Details</h1>
      <br></br>
      <h2>Company Logo:{job[0].logo_path}</h2>
      <br></br> */}
        <Grid item xs={3}></Grid>

        <Grid container item xs={4} alignItems="flex-start" direction="column">
          <Typography variant={"h1"} sx={{ fontSize: "3em" }}>
            {job[0].title}
          </Typography>
          <Typography variant={"h2"} sx={{ fontSize: "1em" }}>
            {job[0].company_name}
          </Typography>
          {/* <Typography variant={'h2'} sx={{ fontSize: '2em' }}>{job[0].company_address}</Typography> */}
        </Grid>

        <Grid item xs={5}></Grid>
        <Grid item xs={3}></Grid>
        <Grid item xs={6}>
          <p className="formatText">{job[0].description}</p>
        </Grid>
      </Grid>
    </>
  );
}

export default CandidateJobDetails;
