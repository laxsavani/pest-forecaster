
from sqlalchemy.orm import Session
from .models import PestType
from .database import SessionLocal, Base, engine

def seed():
    Base.metadata.create_all(bind=engine)
    db: Session = SessionLocal()
    try:
        pests = [
            ("aphid","Sap-sucking insects affecting many crops"),
            ("bollworm","Cotton bollworm common in cotton"),
            ("stem_borer","Affects cereals like rice, maize"),
            ("whitefly","Vector for plant viruses, affects cotton/veg"),
        ]
        for name, desc in pests:
            if not db.query(PestType).filter_by(name=name).first():
                db.add(PestType(name=name, description=desc))
        db.commit()
    finally:
        db.close()

if __name__ == "__main__":
    seed()
    print("Seeded pests and ensured DB tables exist.")
