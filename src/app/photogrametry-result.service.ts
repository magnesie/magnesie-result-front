import { Injectable } from '@angular/core';
import { PhotogrametryResult } from './photogrametry-result';

@Injectable({
  providedIn: 'root'
})
export class PhotogrametryResultService {

  constructor() { }

  getResults():PhotogrametryResult[] {
    return [
      { id: 11, path: 'http://localhost/files/results/12345/scene_dense_mesh_refine_texture.ply' },
    ];
  }
}
