import React, { useState } from "react";
import "./App.css";
import ControllerButtonView from "./ControllerButtonView";
import ConfigPanel from "./ConfigPanel";
import { Config } from "haybox-webserial";

const defaultConfig = Config.fromJson({
  gameModeConfigs: [
    {
      modeId: "MODE_ULTIMATE",
      socdPairs: [
        {
          buttonDir1: "BTN_LF3",
          buttonDir2: "BTN_LF1",
          socdType: "SOCD_2IP",
        },
        {
          buttonDir1: "BTN_LF2",
          buttonDir2: "BTN_RF4",
          socdType: "SOCD_2IP",
        },
        {
          buttonDir1: "BTN_RT3",
          buttonDir2: "BTN_RT5",
          socdType: "SOCD_2IP",
        },
        {
          buttonDir1: "BTN_RT2",
          buttonDir2: "BTN_RT4",
          socdType: "SOCD_2IP",
        },
      ],
    },
  ],
  communicationBackendConfigs: [
    {
      backendId: "COMMS_BACKEND_NINTENDO_SWITCH",
      defaultModeConfig: 1,
    },
    {
      backendId: "COMMS_BACKEND_CONFIGURATOR",
      activationBinding: ["BTN_RT2"],
    },
  ],
  defaultBackendConfig: 1,
  defaultUsbBackendConfig: 1,
});

const ConfiguratorPage: React.FC = () => {
  const [config, setConfig] = useState<Config>(defaultConfig);
	const [mapUpdateTrigger, setMapUpdateTrigger] = useState<string>('');

	const forceMapReset = (status: boolean) => {
		if (status) {
			setMapUpdateTrigger('controller connected');
		} else {
			setMapUpdateTrigger('');
		};
	};

  return (
    <div className="h-screen flex justify-center items-center ">
      <ControllerButtonView config={config} setConfig={setConfig} mapUpdateTrigger={mapUpdateTrigger} />
      <ConfigPanel config={config} setConfig={setConfig} onImport={forceMapReset} />
    </div>
  );
}

export default ConfiguratorPage;
