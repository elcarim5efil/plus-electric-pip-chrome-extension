const bucket = 'public-bucket-elcarim';

function nosUrl(objectName) {
  return `https://${bucket}.nos-eastchina1.126.net/${objectName}`;
}

function fetchImage(url) {
  return fetch(url)
    .then(response => response.blob());
}

function fetchToken(fileName) {
  const tokenUrl = `http://realign.pw/nos-netease-cloud-server/nos.php?bucketName=${bucket}&objectName=${fileName}`;
  return fetch(tokenUrl)
    .then(res => res.json())
    .then(json => json.token);
}

function createPrepareUploadDataFn(name) {
  return function prepareUploadData(imageBlob) {
    const { type } = imageBlob;
    console.log(imageBlob)
    const ext = `.${type.replace(/^image\//, '')}`;
    const fileName = `${name}${ext}`;
    const file = new File([imageBlob], fileName, {
      type: imageBlob.type
    });
    return fetchToken(fileName)
      .then((token) => ({
        token,
        name: fileName,
        type,
        ext,
        imageBlob,
        file
      }));
  }
}

function uploadImage({file, name, token}) {
  return new Promise((resolve, reject) => {
    const uploader = window.Uploader({
      onProgress(progress) {
        if (progress.status === 2) {
          const remoteUrl = nosUrl(name);
          resolve(remoteUrl)
        }
      }
    });
    const param = {
      bucketName: bucket,
      objectName: name,
      token
    };
    uploader.addFile(file);
    uploader.upload(param);
  })
}

export function fetchAndUploadImage(url, name) {
  return fetchImage(url)
    .then(createPrepareUploadDataFn(name))
    .then(uploadImage);
}