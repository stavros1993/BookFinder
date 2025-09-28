import "./WebsiteFeatureItem.scss";

function WebsiteFeatures({ children, Icon, title }) {
  return (
    <div className="col-sm-6 col-lg pb-4 pb-lg-0 col-website-feature">
      <div className="boxed-content">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h2 className="h4 lh-1 mb-0">{title} </h2>
          <Icon />
        </div>
        <p className="mb-0">{children}</p>
      </div>
    </div>
  );
}

export default WebsiteFeatures;
