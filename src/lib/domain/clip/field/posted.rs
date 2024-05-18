use crate::domain::Time;
use serde::{Deserialize, Serialize};
use derive_more::Constructor;

#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct Posted(Time);

impl Posted {
    pub fn into_innner(self) -> Time {
        self.0
    }
}