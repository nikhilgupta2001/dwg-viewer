import React, { Fragment } from "react";

function App() {
  return (
    <Fragment>
      <nav className="navbar navbar-default navbar-fixed-top" />
      <div className="container-fluid fill">
        <div className="row fill">
          <div className="col-sm-4 fill">
            <div className="panel panel-default fill">
              <div className="panel-heading" data-toggle="tooltip">
                Buckets &amp; Objects
                <span
                  id="refreshBuckets"
                  className="glyphicon glyphicon-refresh"
                  style={{ cursor: "pointer" }}
                />
                <button
                  className="btn btn-xs btn-info"
                  style={{ float: "right" }}
                  id="showFormCreateBucket"
                  data-toggle="modal"
                  data-target="#createBucketModal"
                >
                  <span className="glyphicon glyphicon-folder-close" /> New
                  bucket
                </button>
              </div>
              <div id="appBuckets">tree here</div>
            </div>
          </div>
          <div className="col-sm-8 fill">
            <div id="forgeViewer" />
          </div>
        </div>
      </div>
      <form id="uploadFile" method="post" encType="multipart/form-data">
        <input
          id="hiddenUploadField"
          type="file"
          name="theFile"
          style={{ visibility: "hidden" }}
        />
      </form>

      <div
        className="modal fade"
        id="createBucketModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="myModalLabel"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Cancel"
              >
                <span aria-hidden="true">&times;</span>
              </button>
              <h4 className="modal-title" id="myModalLabel">
                Create new bucket
              </h4>
            </div>
            <div className="modal-body">
              <input type="text" id="newBucketKey" className="form-control" />{" "}
              For demonstration purposes, objects (files) are NOT automatically
              translated. After you upload, right click on the object and select
              "Translate". Note: Technically your bucket name is required to be
              globally unique across the entire platform - to keep things simple
              with this tutorial your client ID will be prepended by default to
              your bucket name and in turn masked by the UI so you only have to
              make sure your bucket name is unique within your current Forge
              app.
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-default"
                data-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                id="createNewBucket"
              >
                Go ahead, create the bucket
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
