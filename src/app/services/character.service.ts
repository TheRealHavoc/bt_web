import { Injectable } from '@angular/core';
import { Character } from '../models/Character';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  public characters: Character[] = [
    {
      id: "abcd",
      name: "Tara Qim",
      avatarUrl: "https://www.gmbinder.com/images/RL0wHsa.jpg",
      armorClass: 14,
      maxHitPoints: 25,
      strengthScore: 12,
      dexterityScore: 16,
      constitutionScore: 12
    },
    {
      id: "zyxv",
      name: "Mardok The Cruel",
      avatarUrl: "https://b2358178.smushcdn.com/2358178/wp-content/uploads/2022/01/HalfOrc-Illustration.jpg?lossy=1&strip=1&webp=1",
      armorClass: 10,
      maxHitPoints: 32,
      strengthScore: 16,
      dexterityScore: 8,
      constitutionScore: 15
    },
  ];

  constructor() { }
}
