import React from "react";
// import {RiEmptyFolderLine} from "react-icons/ri";
import {RiBarChartBoxLine} from "react-icons/ri";

const WidgetContent = ({content}) => {
  if (!content) return null;

  switch (content.type) {
    case "text":
      return <p>{content.text}</p>;

    case "empty":
      return (
        <div className="flex flex-col items-center justify-center h-full p-6 text-center">
          <RiBarChartBoxLine className="w-16 h-16 text-gray-300 mb-3" />
          <p className="text-gray-500 text-sm font-medium">
            {content.message || "No data available"}
          </p>
        </div>
      );

    case "donut-chart":
      const {total, connected, notConnected} = content.data;
      const connectedPercentage = (connected / total) * 100;

      return (
        <div className="flex items-center justify-between">
          <div className="relative w-32 h-32">
            <svg viewBox="0 0 36 36" className="w-full h-full">
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#e6e6e6"
                strokeWidth="3"
              />
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#4ade80"
                strokeWidth="3"
                strokeDasharray={`${connectedPercentage}, 100`}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-2xl font-semibold">{total}</div>
              <div className="text-xs text-gray-500">Total</div>
            </div>
          </div>
          <div className="ml-4">
            <div className="flex items-center mb-1">
              <div className="w-3 h-3 rounded-full bg-green-400 mr-2"></div>
              <span>Connected: {connected}</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-gray-300 mr-2"></div>
              <span>Not Connected: {notConnected}</span>
            </div>
          </div>
        </div>
      );

    case "risk-chart":
      const {total: riskTotal, failed, warning, notEvaluated, passed} = content.data;
      // Calculate percentages for the stroke-dasharray
      const failedPercent = (failed / riskTotal) * 100;
      const warningPercent = (warning / riskTotal) * 100;
      const notEvalPercent = (notEvaluated / riskTotal) * 100;
      const passedPercent = (passed / riskTotal) * 100;

      // Calculate stroke dash offsets
      const warningOffset = failedPercent;
      const notEvalOffset = failedPercent + warningPercent;
      const passedOffset = failedPercent + warningPercent + notEvalPercent;

      return (
        <div className="flex items-center justify-between">
          <div className="relative w-32 h-32">
            <svg viewBox="0 0 36 36" className="w-full h-full">
              {/* Background circle */}
              <circle cx="18" cy="18" r="15.9155" fill="white" />

              {/* Passed - Green */}
              <circle
                cx="18"
                cy="18"
                r="15.9155"
                fill="none"
                stroke="#4ade80"
                strokeWidth="3.8"
                strokeDasharray={`${passedPercent} ${100 - passedPercent}`}
                strokeDashoffset={-passedOffset}
                transform="rotate(-90 18 18)"
              />

              {/* Not Evaluated - Gray */}
              <circle
                cx="18"
                cy="18"
                r="15.9155"
                fill="none"
                stroke="#d1d5db"
                strokeWidth="3.8"
                strokeDasharray={`${notEvalPercent} ${100 - notEvalPercent}`}
                strokeDashoffset={-notEvalOffset}
                transform="rotate(-90 18 18)"
              />

              {/* Warning - Yellow */}
              <circle
                cx="18"
                cy="18"
                r="15.9155"
                fill="none"
                stroke="#fbbf24"
                strokeWidth="3.8"
                strokeDasharray={`${warningPercent} ${100 - warningPercent}`}
                strokeDashoffset={-warningOffset}
                transform="rotate(-90 18 18)"
              />

              {/* Failed - Red */}
              <circle
                cx="18"
                cy="18"
                r="15.9155"
                fill="none"
                stroke="#ef4444"
                strokeWidth="3.8"
                strokeDasharray={`${failedPercent} ${100 - failedPercent}`}
                strokeDashoffset="0"
                transform="rotate(-90 18 18)"
              />

              {/* Inner white circle to create donut effect */}
              <circle cx="18" cy="18" r="12" fill="white" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-xl font-semibold">{riskTotal}</div>
              <div className="text-xs text-gray-500">Total</div>
            </div>
          </div>

          <div className="ml-4">
            <div className="flex items-center mb-1">
              <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
              <span>Failed: {failed}</span>
            </div>
            <div className="flex items-center mb-1">
              <div className="w-3 h-3 rounded-full bg-yellow-400 mr-2"></div>
              <span>Warning: {warning}</span>
            </div>
            <div className="flex items-center mb-1">
              <div className="w-3 h-3 rounded-full bg-gray-300 mr-2"></div>
              <span>Not available: {notEvaluated}</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
              <span>Passed: {passed}</span>
            </div>
          </div>
        </div>
      );

    case "risk-bar":
      const {
        total: barTotal,
        critical,
        high,
        moderate,
        good,
        notAvailable,
      } = content.data;

      return (
        <div>
          <div className="mb-1">
            <div className="flex items-center">
              <span className="text-lg font-semibold">{barTotal}</span>
              <span className="text-xs text-gray-500 ml-1">Total Vulnerabilities</span>
            </div>
          </div>

          <div className="w-full h-4 rounded overflow-hidden flex mb-3">
            {critical > 0 && (
              <div
                className="bg-red-900 h-full"
                style={{width: `${(critical / barTotal) * 100}%`}}
              ></div>
            )}
            {high > 0 && (
              <div
                className="bg-red-500 h-full"
                style={{width: `${(high / barTotal) * 100}%`}}
              ></div>
            )}
            {moderate > 0 && (
              <div
                className="bg-yellow-600 h-full"
                style={{width: `${(moderate / barTotal) * 100}%`}}
              ></div>
            )}
            {good > 0 && (
              <div
                className="bg-green-600 h-full"
                style={{width: `${(good / barTotal) * 100}%`}}
              ></div>
            )}
            {notAvailable > 0 && (
              <div
                className="bg-gray-300 h-full"
                style={{width: `${(notAvailable / barTotal) * 100}%`}}
              ></div>
            )}
          </div>

          <div className="space-y-1 text-sm flex items-center justify-between flex-wrap">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-red-900 mr-2"></div>
              <span>Critical ({critical || 0})</span>
            </div>

            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
              <span>High ({high || 0})</span>
            </div>

            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-yellow-600 mr-2"></div>
              <span>Moderate ({moderate || 0})</span>
            </div>

            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-600 mr-2"></div>
              <span>Good ({good || 0})</span>
            </div>

            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-gray-300 mr-2"></div>
              <span>Not Available ({notAvailable || 0})</span>
            </div>
          </div>
        </div>
      );

    default:
      return <p>Unknown content type</p>;
  }
};

export default WidgetContent;
