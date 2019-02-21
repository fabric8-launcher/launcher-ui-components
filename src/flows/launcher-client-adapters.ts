
export function toNewAppPayload(app) {
  let parts: any[] = [];

  if (app.frontend.runtime) {
    parts.push({
      category: 'frontend',
      shared: {
        runtime: { name: app.frontend.runtime!.id, version: 'community' }
      }
    });
  }

  if (app.backend.runtime) {
    parts.push({
      category: 'backend',
      shared: {
        runtime: { name: app.backend.runtime!.id, version: 'community' }
      },
      capabilities: app.backend.capabilities
        .filter(c => c.selected)
        .map(c => ({ module: c.id, props: c.data }))
    });
  }

  if(parts.length > 1) {
    parts = parts.map(p => ({ ...p, subFolderName: p.category }));
  }

  return {
    name: app.srcLocation.repository!.name,
    repository:  app.srcLocation.repository!.name,
    organization: app.srcLocation.repository!.org || '',
    clusterId: 'local',
    projectName: app.srcLocation.repository!.name,
    parts,
  };
}

export function toExamplePayload(app) {
  const parts: any[] = [];

  parts.push({
    category: 'example',
    shared: {
      mission: { id: app.example.missionId },
      runtime: { name: app.example.runtimeId, version: app.example.versionId }
    }
  });

  return {
    name: app.srcLocation.repository!.name,
    repository:  app.srcLocation.repository!.name,
    organization: app.srcLocation.repository!.org || '',
    clusterId: 'local',
    projectName: app.srcLocation.repository!.name,
    parts,
  };
}
