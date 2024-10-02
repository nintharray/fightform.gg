import React, { useState, useRef } from "react";
import WebUSB from "./WebUSB";
import { Config, GameModeConfig, SocdPair, SocdType } from "haybox-webserial";

interface SettingsProps {
  config: Config;
  setConfig: React.Dispatch<React.SetStateAction<Config>>;
	onImport: (status: boolean) => void;
}

const ConfigPanel: React.FC<SettingsProps> = ({ config, setConfig, onImport }) => {
  const [selectedSocdType, setSelectedSocdType] = useState<string>("SOCD_2IP");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const printConfigToJson = () => {
    console.log("config:", JSON.stringify(config, null, 2));
  };

  const downloadConfig = () => {
    const configString = JSON.stringify(config, null, 2);
    const blob = new Blob([configString], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "fightform-config.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const uploadConfig = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        console.log("FileReader onload triggered"); // Debugging
        try {
          const json = JSON.parse(e.target?.result as string);
          const importedConfig = Config.fromJson(json);
          setConfig(importedConfig);
        } catch (err) {
          console.error("Error parsing JSON:", err);
        }
      };
      reader.readAsText(file);
    }
  };

  const updateSocdTypeInGameMode = (index: number, newSocdType: string) => {
    const updatedGameModeConfigs = config.gameModeConfigs.map(
      (gameModeConfig: GameModeConfig, i: number) => {
        if (i === index) {
          // Create a new list of SocdPair objects with the updated socdType
          const updatedSocdPairs = gameModeConfig.socdPairs.map(
            (socdPair: SocdPair) =>
              new SocdPair({
                buttonDir1: socdPair.buttonDir1,
                buttonDir2: socdPair.buttonDir2,
                socdType: SocdType[newSocdType as keyof typeof SocdType],
              }),
          );

          // Return a new GameModeConfig with the updated socdPairs
          return new GameModeConfig({
            modeId: gameModeConfig.modeId,
            socdPairs: updatedSocdPairs,
          });
        }
        return gameModeConfig;
      },
    );

    console.log(updatedGameModeConfigs);

    const updatedConfig = new Config({
      gameModeConfigs: updatedGameModeConfigs,
      communicationBackendConfigs: config.communicationBackendConfigs,
    });

    setConfig(updatedConfig);
  };

  const handleSocdTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSocdType = e.target.value;
    setSelectedSocdType(newSocdType);
    updateSocdTypeInGameMode(0, newSocdType); // TODO implement multi profile
  };

  const debug = false;

  return (
    <div className="w-1/4 min-w-[330px] h-full ml-auto bg-zinc-900 rounded-tl-lg rounded-bl-lg">
      <div className="flex items-center px-2">
        <h2 className="text-lg text-zinc-600">Profile</h2>
        <div className="flex-grow border-t border-zinc-600 ml-2"></div>
      </div>
      <div className="flex items-center p-4 mb-16">
        <p className="text-zinc-400 text-lg"> SOCD: </p>
        <div className="flex mx-auto justify-center">
          <div className="relative inline-block w-52">
            <select
              value={selectedSocdType}
              onChange={handleSocdTypeChange}
              className="block appearance-none w-full bg-zinc-600 text-zinc-400 py-1 px-4 pr-8 rounded-md leading-tight focus:outline-none focus:ring-2 focus:ring-zinc-300"
            >
              <option value="SOCD_2IP">2IP (default)</option>
              <option value="SOCD_2IP_NO_REAC">2IP No Reactivation</option>
              <option value="SOCD_NEUTRAL">Neutral</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-zinc-800">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center px-2">
        <h2 className="text-lg text-zinc-600">Config</h2>
        <div className="flex-grow border-t border-zinc-600 ml-2"></div>
      </div>

      <div className="flex flex-col items-center justify-center mb-16">
        <div className="w-full p-2">
          <button
            onClick={downloadConfig}
            className="mx-2 bg-zinc-300 text-zinc-900 font-semibold py-2 px-4 rounded-full hover:bg-zinc-200 active:bg-zinc-400"
          >
            Download Config
          </button>
        </div>
        <div className="w-full p-2">
          <input
            type="file"
            accept=".json"
            className="hidden"
            ref={fileInputRef}
            onChange={uploadConfig}
          />
          <button
            onClick={handleUploadClick}
            className="mx-2 bg-zinc-300 text-zinc-900 font-semibold py-2 px-4 rounded-full hover:bg-zinc-200 active:bg-zinc-400"
          >
            Open Config
          </button>
        </div>
      </div>
      <div className="flex items-center px-2">
        <h2 className="text-lg text-zinc-600">Device</h2>
        <div className="flex-grow border-t border-zinc-600 ml-2"></div>
      </div>
      <WebUSB config={config} setConfig={setConfig} onImport={onImport} />
      {debug ? (
        <>
          <div className="flex items-center px-2">
            <h2 className="text-lg text-zinc-600">Developer Options</h2>
            <div className="flex-grow border-t border-zinc-600 ml-2"></div>
          </div>
          <div className="flex items-center justify-center">
            <button
              onClick={printConfigToJson}
              className="mx-2 bg-zinc-300 text-zinc-900 font-semibold py-2 px-4 rounded-full hover:bg-zinc-200 active:bg-zinc-400"
            >
              Print to Console
            </button>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ConfigPanel;
