const Realm = require('realm');

const favoriteCharactorSchema = {
  name: 'FavoriteCharactor',
  properties: {
    name: "string"
  }
}

const realm = new Realm({
  schema: [ favoriteCharactorSchema ],
  schemaVersion: 1
})

const serializeFavoriteCharactors = (realmCharactors) => {
  let charactors = [];
  for (index = 0; index < realmCharactors.length; index++) {
    charactors.push({
      name: realmCharactors[index].name
    });
  }
  return charactors;
}

export const getRealmFavoriteCharactors = () => {
  return serializeFavoriteCharactors(realm.objects('FavoriteCharactor'));
}

export const createRealmFavoriteCharactor = (name) => {
  let newFavoriteCharactor = null;
  realm.write(() => {
    newFavoriteCharactor = realm.create('FavoriteCharactor', {
      name: name
    })
  })
  return newFavoriteCharactor;
}

export const destroyRealmFavoriteCharactor = (name) => {
  let charactors = realm.objects('FavoriteCharactor');
  realm.write(() => {
    realm.delete(charactors.filtered(`name = "${name}"`));
  })
}
