import React from "react";
import LoadingSpinner from "../../ui/LoadingSpinner";

const LoadingState: React.FC = () => {
  return (
    <div className="flex justify-center items-center py-12">
      <LoadingSpinner size="lg" color="primary" />
    </div>
  );
};

export default LoadingState;