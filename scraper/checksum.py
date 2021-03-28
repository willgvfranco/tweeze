import hashlib


def generate_hash(file):
    md5_hash = hashlib.md5()
    md5_hash.update(file)
    digest = md5_hash.hexdigest()
    print(digest)
    return digest
