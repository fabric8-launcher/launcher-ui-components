import React from 'react';
import { AnalyzeResult, BuilderImage } from 'launcher-client';
import { useLauncherClient } from '../contexts/launcher-client-context';
import { DataLoader } from '../core/data-loader/data-loader';

export function BuildImageAnalyzerLoader(props: { gitUrl: string, children: (result: AnalyzeResult) => any }) {
  const client = useLauncherClient();
  const itemsLoader = () => client.importAnalyze(props.gitUrl);
  return (
    <DataLoader loader={itemsLoader}>
      {props.children}
    </DataLoader>
  );
}

interface BuildImageSuggestions {
 builderImages: BuilderImage[];
 suggestedBuilderImage: BuilderImage;
 getSuggestedEnvPairs: (image: string) => Array<{ key: string; value: string }>;
}

interface BuildImageSuggestionsLoaderProps {
  gitUrl: string;
  children: (suggestions: BuildImageSuggestions) => any;
}

const convertToPairs = object => {
  const result: Array<{ key: string; value: string }> = [];
  let i = 0;
  for (const k in object) {
    if (object.hasOwnProperty(k)) {
      result[i++] = {key: k, value: object[k]};
    }
  }
  if(result.length === 0) {
    return [{ key: '', value: ''}];
  }
  return result;
};

const findBuilderImage = (result: AnalyzeResult, image?: string) => {
  const found = result.builderImages.find(i => i.id === (image || result.image));
  if (!found) {
    throw Error('invalid builder image');
  }
  return found;
};

export function BuildImageSuggestionsLoader(props: BuildImageSuggestionsLoaderProps) {
  const client = useLauncherClient();
  const itemsLoader = async () => {
    const result = await client.importAnalyze(props.gitUrl);
    const suggestedBuilderImage = findBuilderImage(result);
    const getSuggestedEnvPairs = (image: string) => convertToPairs(findBuilderImage(result, image).metadata.suggestedEnv);
    return {suggestedBuilderImage, getSuggestedEnvPairs, builderImages: result.builderImages};
  };
  return (
    <DataLoader loader={itemsLoader}>
      {props.children}
    </DataLoader>
  );
}
