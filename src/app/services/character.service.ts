import { Injectable } from '@angular/core';
import { Character } from '../models/Character';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  constructor(
    private http: HttpClient
  ) { }

    public getCharacters(): Promise<any> {
      return new Promise((resolve, reject) => {
        this.http.get<Character[]>(`${environment.apiUrl}Character/GetCharacters`).subscribe({next: (res) => {
          resolve(res);
        }, error: (error) => {
          reject(error);
        }})
      })
    }

    public getCharacter(id: string): Promise<any> {
      return new Promise((resolve, reject) => {
        this.http.get<Character[]>(`${environment.apiUrl}Character/GetCharacter?characterId=${id}`).subscribe({next: (res) => {
          resolve(res);
        }, error: (error) => {
          reject(error);
        }})
      })
    }
}
